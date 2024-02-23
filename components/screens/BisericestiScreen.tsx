import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonView } from '../common/CommonView';
import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger, Box, Button, Card, ChevronDownIcon, ChevronUpIcon, Heading, VStack, useColorMode } from '@gluestack-ui/themed';import { CommonHeader } from '../common/CommonHeader';
import { useEffect, useMemo, useState } from 'react';
import { getPageChildren } from '../../domain/helpers/pages.helper';
import { isEmpty, isNil } from 'lodash';
import { ButtonText } from '@gluestack-ui/themed';
import { ChevronRightIcon } from '@gluestack-ui/themed';
import { ButtonIcon } from '@gluestack-ui/themed';
import useAsyncSetting from '../../domain/hooks/setting.hook';

export const BisericestiScreen = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
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
      : '$primary900'
  ), [ theme ])
  const btnColor = useMemo(() => (
    theme === 'dark'
      ? '$primary100'
      : '$primary00'
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
                        <AccordionIcon as={isExpanded ? ChevronUpIcon : ChevronDownIcon} ml="$3"  color={cardColor} />
                      </>
                    )
                  }}
                </AccordionTrigger>                
              </AccordionHeader>
              <AccordionContent>
                <VStack
                  space='lg'
                >
                {renderChildren(child)}
                </VStack>
              </AccordionContent>
            </AccordionItem>
          )}

          {isNil(child.children) && (
            <Button
              justifyContent='flex-start' 
              alignContent='flex-start' 
              variant="link"
              height="auto"
              py={5}
              onPress={() => {
                navigation.navigate( 'content' , {
                  screen: 'content',
                  title: 'Content',
                  pageId: child.id
                })                  
              }}
            >
              <ButtonText
                color="$red600"
              >
                {child.title}
              </ButtonText>
            </Button>
          )}
        </Box>
      )

    })
  }

  useEffect(() => {
    const prepare  = async() => {
      const struct  = await getPageChildren( 'slujbe', 0 );
      setData(struct);
    }

    prepare();
  }, []);

  return (
    <CommonView>
      <CommonHeader title='Rugăciuni particulare' navigation={navigation} backLink="home" />

      {data.map(item => (
        <Card 
          key={item.id} 
          m={8} 
          backgroundColor={cardBg}
        >
          <Heading mb="$1" size="lg" color={cardColor} borderBottomColor={cardColor} borderBottomWidth={1}>
            {item.title}
          </Heading>

          <Accordion
            width="95%"
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
  );}