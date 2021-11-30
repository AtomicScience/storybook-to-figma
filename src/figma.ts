import { defaultFont, getDropOffset, addLayersToFrame } from 'html-figma/figma';

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
  if(message?.request == "READ_TODO_STORAGE") {
    console.log("READ_TODO_STORAGE");
    let todoEntries = await figma.clientStorage.getAsync("todo_entries");
    
    let responce = {
      result: todoEntries || [],
      timestamp: message.timestamp
    }

    figma.ui.postMessage(responce);
  } else if(message?.request == "WRITE_TODO_STORAGE") {
    console.log("WRITE_TODO_STORAGE");
    let todoEntries = message.payload;

    let responce = {
      result: "OK",
      timestamp: message.timestamp
    }

    await figma.clientStorage.setAsync("todo_entries", todoEntries);
    figma.ui.postMessage(responce);
  }
}