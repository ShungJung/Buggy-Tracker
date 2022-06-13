import React, { useState } from 'react';
import{ Link } from 'react-router-dom';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Button,
  Image,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Tooltip,
} from '@mantine/core';
import { faDiagramProject, faTicket, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BuggyLogo from '../../images/BuggyLogo.svg';

function Sidebar() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <div style={{display: "flex", flexDirection :"column"}}>
            <Text component={Link} variant="link" to="/">
            <Button variant="filled" color='white' size='xs' styles={{
                root: {
                    backgroundColor:'unset'
                }}
            }   >
                <Image src={BuggyLogo} width={50} height={50} >
                </Image>
            </Button>
            </Text>

            <Text component={Link} variant="link" to="/projects">
                        
                <Tooltip 
                    label="Projects"
                    color="black" 
                    withArrow
                    >
                    <Button variant="filled" color='blue' size='xs' >
                        <FontAwesomeIcon icon={faDiagramProject} size="2x" color="black" align="left" />
                    </Button>
                </Tooltip>                   
            </Text>
          
            <Text component={Link} variant='link' to='/issue'>
                <Tooltip
                    label="Issues"
                    color="black"
                    withArrow
                    >
                        <Button variant='filled' color='yellow' size='xs'>
                            <FontAwesomeIcon icon={faTicket} size="2x" color="black" align="left" />
                           
                        </Button>
                </Tooltip>
            </Text>

            <Text component={Link} variant='link' to='/createIssue'>

                <Tooltip
                    label="CreateIssue"
                    color="black"
                    withArrow
                    >
                    <Button variant='filled' color='green' size='xs'>
                        <FontAwesomeIcon icon={faPlus} size="2x" color="black" align="left" />
                    </Button>
                </Tooltip>
            </Text>
          </div>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
}
export default Sidebar;