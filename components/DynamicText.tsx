import React, { useImperativeHandle, useState, forwardRef } from "react";
import { Text } from "@chakra-ui/react";

const DynamicText = ({}, ref) => {
  const [value, setValue] = useState("hello world!");

  const _changeValue = (newValue) => {
    setValue(newValue);
  };

  useImperativeHandle(ref, () => ({
    changeValue: _changeValue,
  }));

  return (
    <Text as="p" textAlign="center">
      {value}
    </Text>
  );
};

export default forwardRef(DynamicText);
