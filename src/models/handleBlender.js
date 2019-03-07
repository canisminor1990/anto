import Sketch from '../sketch';

export default class handleBlender extends Sketch {
  constructor() {
    super();
    this.namespace = '图层混合|handleBlender';
  }

  getColor(selectionType, layer) {
    let color;

    if (selectionType === 'fill') {
      if (layer instanceof MSTextLayer) {
        color = layer.textColor();
      } else {
        color = layer
          .style()
          .fills()
          .firstObject()
          .color();
      }
    } else {
      if (layer instanceof MSTextLayer) {
        color = layer
          .style()
          .borders()
          .firstObject()
          .color();
      } else {
        color = layer
          .style()
          .borders()
          .firstObject()
          .color();
      }
    }
    return color;
  }

  getNum(num1, num2, index, count) {
    return ((num2 - num1) / (count - 1)) * index + num1;
  }

  handleStep(steps) {
    const selectedLayers = this.native.selection.layers();
    const selectedCount = selectedLayers.length;

    if (selectedCount !== 0) {
      const layerColor = new Array(selectedCount);
      const layerBorderColor = new Array(selectedCount);
      const layerPosX = new Array(selectedCount);
      const layerPosY = new Array(selectedCount);
      const layerW = new Array(selectedCount);
      const layerH = new Array(selectedCount);
      const layerRadius = new Array(selectedCount);
      const layerOpacity = new Array(selectedCount);
      const layerRotation = new Array(selectedCount);

      // for font
      const layerFontSize = new Array(selectedCount);
      const layerCharacterSpacing = new Array(selectedCount);
      const layerLineheight = new Array(selectedCount);

      const copiedLayers = new Array(selectedCount - 1);

      for (let id = 0; id < selectedCount; id++) {
        // init array
        layerColor[id] = this.getColor('fill', selectedLayers[id]);

        layerPosX[id] = selectedLayers[id].rect().origin.x;
        layerPosY[id] = selectedLayers[id].rect().origin.y;
        layerW[id] = selectedLayers[id].rect().size.width;
        layerH[id] = selectedLayers[id].rect().size.height;
        layerOpacity[id] = selectedLayers[id]
          .style()
          .contextSettings()
          .opacity();
        layerRotation[id] = selectedLayers[id].rotation();

        // for font
        if (selectedLayers[id].className() === 'MSTextLayer') {
          layerFontSize[id] = selectedLayers[id].fontSize();
          layerCharacterSpacing[id] = selectedLayers[id].characterSpacing();
          layerLineheight[id] = selectedLayers[id].lineHeight();
        } else {
          // for rect radius
          // for borders
          layerBorderColor[id] = this.getColor('border', selectedLayers[id]);
          const shape = selectedLayers[id];
          if (shape && shape.isKindOfClass(MSRectangleShape)) {
            layerRadius[id] = selectedLayers[id].cornerRadiusFloat();
          }
        }
      }

      // duplicate layers
      for (let id = 0; id < selectedCount - 1; id++) {
        copiedLayers[id] = [];
        copiedLayers[id].push(selectedLayers[id]);
        copiedLayers[id].push(selectedLayers[id + 1]);
        let layerRec = selectedLayers[id];

        for (let k = 0; k < steps; k++) {
          const newLayer = layerRec.duplicate();
          newLayer.select_byExpandingSelection(true, true);
          newLayer.setName(k.toString());
          copiedLayers[id].splice(k + 1, 0, newLayer);
          layerRec = newLayer;
        }
      }

      for (let id = 0; id < selectedCount - 1; id++) {
        // change their styles
        for (let i = 0; i < steps + 2; i++) {
          const layer = copiedLayers[id][i];

          // color
          const r = Math.round(
            this.getNum(layerColor[id].red(), layerColor[id + 1].red(), i, steps + 2) * 255
          );
          const g = Math.round(
            this.getNum(layerColor[id].green(), layerColor[id + 1].green(), i, steps + 2) * 255
          );
          const b = Math.round(
            this.getNum(layerColor[id].blue(), layerColor[id + 1].blue(), i, steps + 2) * 255
          );
          const a = Math.round(
            this.getNum(layerColor[id].alpha(), layerColor[id + 1].alpha(), i, steps + 2) * 255
          );

          // position
          const x = Math.round(this.getNum(layerPosX[id], layerPosX[id + 1], i, steps + 2));
          const y = Math.round(this.getNum(layerPosY[id], layerPosY[id + 1], i, steps + 2));

          // width & height
          const w = Math.round(this.getNum(layerW[id], layerW[id + 1], i, steps + 2));
          const h = Math.round(this.getNum(layerH[id], layerH[id + 1], i, steps + 2));

          // opacity
          const op = this.getNum(layerOpacity[id], layerOpacity[id + 1], i, steps + 2);

          // rotation
          const rot = this.getNum(layerRotation[id], layerRotation[id + 1], i, steps + 2);
          layer.setRotation(rot);

          // set position and width height
          layer.rect = NSMakeRect(x, y, w, h);
          layer
            .style()
            .contextSettings()
            .setOpacity(op);

          if (selectedLayers[id].className() === 'MSTextLayer') {
            const fs = this.getNum(layerFontSize[id], layerFontSize[id + 1], i, steps + 2);
            const cs = this.getNum(
              layerCharacterSpacing[id],
              layerCharacterSpacing[id + 1],
              i,
              steps + 2
            );
            const lh = this.getNum(layerLineheight[id], layerLineheight[id + 1], i, steps + 2);

            layer.setFontSize(fs);
            layer.setCharacterSpacing(cs);
            layer.setLineHeight(lh);
            layer.textColor = MSColor.colorWithRed_green_blue_alpha(
              r / 255,
              g / 255,
              b / 255,
              a / 255
            );
          } else {
            const fill = layer
              .style()
              .fills()
              .firstObject();
            const br = Math.round(
              this.getNum(
                layerBorderColor[id].red(),
                layerBorderColor[id + 1].red(),
                i,
                steps + 2
              ) * 255
            );
            const bg = Math.round(
              this.getNum(
                layerBorderColor[id].green(),
                layerBorderColor[id + 1].green(),
                i,
                steps + 2
              ) * 255
            );
            const bb = Math.round(
              this.getNum(
                layerBorderColor[id].blue(),
                layerBorderColor[id + 1].blue(),
                i,
                steps + 2
              ) * 255
            );
            const ba = Math.round(
              this.getNum(
                layerBorderColor[id].alpha(),
                layerBorderColor[id + 1].alpha(),
                i,
                steps + 2
              ) * 255
            );

            const border = layer
              .style()
              .borders()
              .firstObject();
            border.color = MSColor.colorWithRed_green_blue_alpha(
              br / 255,
              bg / 255,
              bb / 255,
              ba / 255
            );

            const shape = selectedLayers[id];
            fill.color = MSColor.colorWithRed_green_blue_alpha(r / 255, g / 255, b / 255, a / 255);
            if (shape && shape.isKindOfClass(MSRectangleShape)) {
              layer.cornerRadiusFloat = Math.round(
                this.getNum(parseInt(layerRadius[id]), parseInt(layerRadius[id + 1]), i, steps + 2)
              );
            }
          }
        }
      }
    }
  }

  run() {
    if (this.selection.length < 2) return this.ui.warn('请选择两个以上图层');
    this.ui.inputPanel('请输入歩进数', { initialValue: 10 }, (err, value) => {
      if (err) return;
      if (parseInt(value) < 1) return this.ui.warn('请输入大于零的数字');
      this.handleStep(parseInt(value));
      this.ui.success(`图层混合完毕`);
    });
  }
}
