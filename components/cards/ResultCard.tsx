import { isEmpty, isNil } from "lodash";
import { Box, Card, HStack, Text, VStack, useColorMode } from "native-base"
import { FC } from "react";

interface IResultCardProps {
  title: string;
  description: string;
  value: string | number;
  unit: string;
  valueDescription?: string;
  color?: string
}

export const ResultCard: FC<IResultCardProps> = ({
  title,
  description,
  unit,
  value,
  valueDescription,
  color
}) => {
  const {
    colorMode,
    toggleColorMode
  } = useColorMode();

  return (
    <Card alignItems="center" mb={3} mx={3} px={2} py={2} backgroundColor={
      isNil( color ) 
      ? colorMode === 'light' 
        ? 'primary.100' 
        : 'primary.900'
      : color
    } rounded={8} shadow={4}>
      <HStack alignItems="center" justifyContent="space-between" mx={3} width="100%" >
        <VStack>
          <Text fontSize="lg" fontWeight="black">{title}</Text>
          <Text fontSize="xs">{description}</Text>
        </VStack>
        <VStack textAlign="right">
          <Text textAlign="center" fontSize="xl" fontWeight="bold">{value}{!isEmpty( unit ) && <Text>&nbsp;{unit}</Text>}</Text>
          {valueDescription && <Text fontSize="xs">{valueDescription}</Text>}
        </VStack>
      </HStack>
    </Card>

  )
}