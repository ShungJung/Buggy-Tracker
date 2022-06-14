import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AppShell,
    Navbar,
    Button,
    Image,
    Text,
    useMantineTheme,
    Tooltip,
    Title,
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
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm:256,lg:256}}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Text component={Link} variant="link" to="/">
                            <Button variant="filled" color='white' styles={{
                                root: {
                                    backgroundColor: 'unset',
                                }
                            }
                            }   >
                                <Image src={BuggyLogo}>
                                </Image>
                            </Button>
                        </Text>

                        <Text component={Link} variant="link" to="/projects">
                            <Tooltip
                                label="Projects"
                                color="black"
                                withArrow
                            >
                                <Button variant="filled" color='blue' size='xs'>
                                    <FontAwesomeIcon icon={faDiagramProject} size="2x" color="black"/>
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
                                    <FontAwesomeIcon icon={faTicket} size="2x" color="black"/>

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
                                    <FontAwesomeIcon icon={faPlus} size="2x" color="black"/>
                                </Button>
                            </Tooltip>
                        </Text>
                    </div>
                </Navbar>
            }
        >
            <Title order={1} align="center">
                <Image src={BuggyLogo} width={50} height={50}>
                </Image>
                Buggy-Tracker
            </Title>

        </AppShell>
    );
}
export default Sidebar;