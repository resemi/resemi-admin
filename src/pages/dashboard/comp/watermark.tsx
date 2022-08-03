import { Form } from '@douyinfe/semi-ui';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FormattedMessage } from 'react-intl';
import { Watermark, WatermarkProps } from '@/components/Watermark';
import { appSelector } from '@/store';

export default function WatermarkPage() {
  const selector = useRecoilValue(appSelector);
  const [initValues, setValues] = useState<WatermarkProps>({
    text: 'Anguer 0104',
    cellSize: 300,
    rotateAngle: -20,
    visible: true,
  });

  function onValueChange(value) {
    setValues({ ...value });
  }

  return (
    <>
      <Watermark {...initValues} color={selector.isDarkMode ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)'} />
      <Form initValues={initValues} onValueChange={onValueChange}>
        <Form.Input field="text" label={<FormattedMessage id="page.components.watermark.form.text" />} />
        <Form.Slider
          field="cellSize"
          label={<FormattedMessage id="page.components.watermark.form.cellSize" />}
          step={10}
          min={200}
          max={400}
        />
        <Form.Slider
          field="rotateAngle"
          label={<FormattedMessage id="page.components.watermark.form.rotateAngle" />}
          step={10}
          min={-180}
          max={180}
        />
        <Form.Switch
          field="visible"
          label={<FormattedMessage id="page.components.watermark.form.visible" />}
          checkedText="｜"
          uncheckedText="〇"
        />
      </Form>
    </>
  );
}
