import { defaultFont, getDropOffset, addLayersToFrame } from 'html-figma/figma';

figma.showUI(__html__, {
  width: 750,
  height: 600,
})

figma.ui.onmessage = async (message) => {
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