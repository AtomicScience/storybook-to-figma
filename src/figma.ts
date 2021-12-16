import { defaultFont, getDropOffset, addLayersToFrame } from 'html-figma/figma';
import RequestType from './modules/figmaStorage/requestType';

figma.showUI(__html__, {
  width: 750,
  height: 600,
})

figma.ui.onmessage = async (message) => {
  console.log(message);
  let data = message.data;

  if(data) {
    await processAddonMessage(message)
  } else {
    await processPluginMessage(message)
  }
}

async function processAddonMessage(message : any) : Promise<void> {
  await figma.loadFontAsync(defaultFont);

  let baseFrame: PageNode | FrameNode = figma.currentPage;

  const { data } = message;
  let { nodes, type } = data;

  for (const { id, layer, position, componentData } of nodes) {
    if (position) {
      const { x, y } = getDropOffset(position);
      layer.x = x;
      layer.y = y;
    }

    await addLayersToFrame([layer], baseFrame);
  }
}

async function processPluginMessage(message : any) {
  if(message?.type === RequestType.GET) {
    console.log("READ_TODO_STORAGE");

    let readResult = await figma.clientStorage.getAsync(message.payload);
    
    let responce = {
      result: readResult || undefined,
      timestamp: message.timestamp
    }

    figma.ui.postMessage(responce);
  } else if (message?.type === RequestType.SET) {
    console.log("WRITE_TODO_STORAGE");
    let {key, value} = message.payload;

    let responce = {
      timestamp: message.timestamp
    }

    await figma.clientStorage.setAsync(key, value);
    figma.ui.postMessage(responce);
  }
}