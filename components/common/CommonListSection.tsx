import { Accordion, AccordionHeader, AccordionIcon, AccordionItem, AccordionTrigger, ChevronDownIcon, ChevronRightIcon, HStack, Icon, Pressable, Text, useColorMode } from "@gluestack-ui/themed";
import { Box, VStack } from "@gluestack-ui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import useAsyncSetting from "../../domain/hooks/setting.hook";
import { useMemo } from "react";
import { isEmpty, isNil } from "lodash";
import { ChevronUpIcon } from "@gluestack-ui/themed";
import { AccordionContent } from "@gluestack-ui/themed";
import { Card } from "@gluestack-ui/themed";

export const CommonListSection = ({ item, navigation }: { item: any, navigation: StackNavigationProp<any> }) => {
  const colorMode = useColorMode();
  const [ theme, setTheme ] = useAsyncSetting( 'theme' );

  const cardBg = useMemo(() => (
    theme === 'dark' 
    ? '$backgroundDark900'
    : '$backgroundLight0'
  ), [ theme ])
  const color = useMemo(() => (
    theme === 'dark' 
    ? '$textLight0'
    : '$textDark950'
  ), [theme]);  
  const cardColor = useMemo(() => (
    theme === 'dark'
      ? '$primary300'
      : '$primary600'
  ), [ theme ])
  const cardLinesColor = useMemo(() => (
    theme === 'dark'
      ? '$borderDark800'
      : '$borderLight200'
  ), [ theme ])
  const btnColor = useMemo(() => (
    theme === 'dark'
      ? '$primary0'
      : '$primary800'
  ), [ theme ])

  const renderChildren = (data) => {
    if (isNil(data.children)) {
      return null;
    }

    return data.children.map(child => {
      return (
        <Box key={child.id}>
          {!isEmpty(child.children) && (
            <AccordionItem value={child.id}>
              <AccordionHeader
              >
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <>
                          <Text
                            color={cardColor}
                            fontFamily="Besley_700Bold"
                          >
                          {child.title}
                          </Text>
                        <AccordionIcon 
                          as={isExpanded ? ChevronUpIcon : ChevronDownIcon} 
                          ml="$3"  
                          color={cardColor} 
                        />
                      </>
                    )
                  }}
                </AccordionTrigger>                
              </AccordionHeader>
              <AccordionContent>
                <VStack>

                {renderChildren(child)}
                </VStack>
              </AccordionContent>
            </AccordionItem>
          )}

          {isNil(child.children) && (
            <Pressable onPress={() => {
              navigation.navigate( 'content' , {
                screen: 'content',
                title: 'Content',
                referer: 'particulare',
                pageId: child.id
              })
            }}>            
            <Box
              borderBottomWidth="$1"
              borderColor={cardLinesColor}
              $base-pl={0}
              $base-pr={0}
              $sm-pl="$2"
              $sm-pr="$2"
              py="$5"
            >
                <HStack
                  space="md"
                  alignItems="flex-start"
                >
                  <Icon 
                    as={ChevronRightIcon} 
                    size="md"
                    color={btnColor}
                    minWidth={20}
                  ></Icon>
                  <Text
                    color={btnColor}
                    fontFamily="Besley_700Bold"
                  >
                    {child.title}
                  </Text>
                </HStack>
            </Box>
          </Pressable>
          )}
        </Box>
      )

    })
  }
  
  
  return (
    <VStack
      space="sm"
    >
      <Text 
        mx="$4"
        size="lg" 
        fontFamily="Besley_700Bold"
        color={color}
        >
        {item.title}
      </Text>

      <Card 
          key={item.id} 
          m={8} 
          p={0}
          backgroundColor={cardBg}
        >
          <Accordion
            width="100%"
            size="md"
            variant="unfilled"
            type="single"
            isCollapsible={true}
            isDisabled={false}
          >          
            {renderChildren(item)}
          </Accordion>
        </Card>                
    </VStack>
  );
}