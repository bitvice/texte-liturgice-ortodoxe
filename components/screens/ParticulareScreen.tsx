import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonView } from '../common/CommonView';
import { Accordion, AccordionHeader, AccordionContent, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger, Box, Button, Card, ChevronDownIcon, ChevronUpIcon, Heading, VStack, useColorMode, HStack, Text, Icon } from '@gluestack-ui/themed';
import { CommonHeader } from '../common/CommonHeader';
import { useEffect, useMemo, useState } from 'react';
import { getPageChildren } from '../../domain/helpers/pages.helper';
import { isEmpty, isNil } from 'lodash';
import { ChevronRightIcon } from '@gluestack-ui/themed';
import useAsyncSetting from '../../domain/hooks/setting.hook';
import { Pressable } from '@gluestack-ui/themed';

export const ParticulareScreen = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  const colorMode = useColorMode();
  const [data, setData] = useState([]);
  const [ theme, setTheme ] = useAsyncSetting( 'theme' );

  const cardBg = useMemo(() => (
    theme === 'dark'
      ? '$primary800'
      : theme === 'light'
        ? '$primary0'
        : '$primary100'
  ), [ theme ])
  const cardColor = useMemo(() => (
    theme === 'dark'
      ? '$primary300'
      : '$primary600'
  ), [ theme ])
  const cardLinesColor = useMemo(() => (
    theme === 'dark'
      ? '$primary700'
      : '$primary300'
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
                        <AccordionTitleText color={cardColor}>
                          {child.title}
                        </AccordionTitleText>
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
              $sm-pl="$4"
              $sm-pr="$5"
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

  useEffect(() => {
    const prepare  = async() => {
      const struct  = await getPageChildren( 'rugaciuni', 0 );
      console.log('[ParticulareScreen] struct', struct);
      setData(struct);
    }

    prepare();
  }, []);

  if (!data) {
    return (
      <CommonView>
        <CommonHeader title='Rugăciuni particulare' navigation={navigation} backLink="home" />
      </CommonView> 
    )
  }

  return (
    <CommonView>
      <CommonHeader title='Rugăciuni particulare' navigation={navigation} backLink="home" />

      {data.map(item => (
        <Card 
          key={item.id} 
          m={8} 
          backgroundColor={cardBg}
        >
          <Heading 
            mb="$1" 
            pb="$2" 
            size="lg" 
            color={cardColor} 
            borderBottomColor={cardColor} 
            borderBottomWidth={1}>
            {item.title}
          </Heading>

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
      ))}

      <StatusBar style="auto" />
    </CommonView>
  );
}