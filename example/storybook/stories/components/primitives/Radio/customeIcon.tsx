import React from 'react';
import { Radio, Icon } from 'native-base';

export default function () {
  return (
    <Radio.Group defaultValue="1" size="lg" name="exampleGroup">
      <Radio
        _text={{ mx: 2 }}
        colorScheme="green"
        value="1"
        icon={<Icon name="alien" type="MaterialCommunityIcons" />}
      >
        Alien
      </Radio>
      <Radio
        _text={{ mx: 2 }}
        colorScheme="red"
        value="2"
        icon={<Icon name="fire" type="MaterialCommunityIcons" />}
      >
        Fire
      </Radio>
      <Radio
        colorScheme="warning"
        _text={{ mx: 2 }}
        value="3"
        icon={<Icon name="exclamation" type="MaterialCommunityIcons" />}
      >
        Warning
      </Radio>
    </Radio.Group>
  );
}
