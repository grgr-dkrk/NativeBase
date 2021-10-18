import React, { forwardRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSliderThumb } from '@react-native-aria/slider';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useToken } from '../../../hooks';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import type { ISliderThumbProps } from './types';
import Box from '../Box';
import { SliderContext } from './Context';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

function SliderThumb(props: ISliderThumbProps, ref: any) {
  const {
    state,
    trackLayout,
    orientation,
    colorScheme,
    thumbSize,
    isReadOnly,
    isDisabled,
  } = React.useContext(SliderContext);
  const resolvedProps = usePropsResolution(
    'SliderThumb',
    {
      size: thumbSize,
      colorScheme,
      ...props,
    },
    { isDisabled, isReadOnly }
  );
  const inputRef = React.useRef(null);
  const { thumbProps, inputProps } = useSliderThumb(
    {
      index: 0,
      trackLayout,
      inputRef,
      orientation,
    },
    state
  );

  const thumbAbsoluteSize = useToken('sizes', resolvedProps.size);

  const thumbStyles: any = {
    bottom:
      orientation === 'vertical'
        ? `${state.getThumbPercent(0) * 100}%`
        : undefined,
    left:
      orientation !== 'vertical'
        ? `${state.getThumbPercent(0) * 100}%`
        : undefined,
    transform:
      orientation === 'vertical'
        ? [{ translateY: parseInt(thumbAbsoluteSize) / 2 }]
        : [{ translateX: -parseInt(thumbAbsoluteSize) / 2 }],
    position: orientation === 'vertical' ? 'absolute' : undefined,
  };

  thumbStyles.transform.push({
    scale: state.isThumbDragging(0) ? resolvedProps.scaleOnPressed : 1,
  });
  //TODO: refactor for responsive prop
  if (useHasResponsiveProps(props)) {
    return null;
  }

  const styles = StyleSheet.create({
    wrapperHorizontal: {
      width: '100%',
    },
    wrapperVertical: {
      alignItems: 'center',
      height: '100%',
      width: thumbSize,
    },
  });

  return (
    <Box
      accessible
      {...inputProps}
      position="absolute"
      pointerEvents="box-none"
      style={
        orientation !== 'vertical'
          ? styles.wrapperHorizontal
          : styles.wrapperVertical
      }
    >
      <Box
        {...thumbProps}
        {...resolvedProps}
        ref={ref}
        style={[thumbStyles, props.style]}
        // {...(isReadOnly && _readOnly)}
        // {...(isDisabled && _disabled)}
      >
        {props.children}
        {Platform.OS === 'web' && (
          <VisuallyHidden>
            <input ref={inputRef} {...inputProps} />
          </VisuallyHidden>
        )}
      </Box>
    </Box>
  );
}

SliderThumb.displayName = 'SliderThumb';

export default forwardRef(SliderThumb);
