import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Aside,
    Box,
    Button,
    Image,
    Text,
    useMantineTheme,
    Tooltip,
    Title,
    UnstyledButton,
    Group,
    Avatar,
    ActionIcon
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { faDiagramProject, faTicket, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BuggyLogo from '../../images/BuggyLogo.svg';
import { User } from'./_user';

function Sidebar() {
    const { hovered, ref }=useHover();
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm:256,lg:256}} ref={ref}>
                    {hovered ? (
                        <>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                        <Text component={Link} variant="link" to="/">
                            <Button variant="filled" color='white' styles={{
                                root: {
                                    backgroundColor: 'unset',
                                }
                            }
                            }   >
                                <Image src={BuggyLogo} size={16}>
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
                                    <ActionIcon size="xl" radius="lg">
                                        <FontAwesomeIcon icon={faDiagramProject} size="2x" color="black"/>
                                    </ActionIcon>
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
                                    <ActionIcon size="xl" radius="lg">
                                        <FontAwesomeIcon icon={faTicket} size="2x" color="black"/>
                                    </ActionIcon>
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
                                    <ActionIcon size="xl" radius="lg">
                                        <FontAwesomeIcon icon={faPlus} size="2x" color="black"/>
                                    </ActionIcon>
                                </Button>
                            </Tooltip>
                        </Text>
                    </div>
                    <Navbar.Section>
                        <User />
                    </Navbar.Section>
                    </>
                    ):(
                        <>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                        <Text component={Link} variant="link" to="/">
                            <Button variant="filled" color='white' styles={{
                                root: {
                                    backgroundColor: 'unset',
                                }
                            }
                            }   >
                                <Image src={BuggyLogo} size={16}>
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
                                    <ActionIcon size="xl" radius="lg">
                                        <FontAwesomeIcon icon={faDiagramProject} size="2x" color="black"/>
                                    </ActionIcon>
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
                                    <ActionIcon size="xl" radius="lg">
                                        <FontAwesomeIcon icon={faTicket} size="2x" color="black"/>
                                    </ActionIcon>
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
                                    <ActionIcon size="xl" radius="lg">
                                        <FontAwesomeIcon icon={faPlus} size="2x" color="black"/>
                                    </ActionIcon>
                                </Button>
                            </Tooltip>
                        </Text>
                    </div>
                    </>
                    )}
                    
                </Navbar>
            }

        >
            <Title order={1} align="center">
                <Image src={BuggyLogo} width={50} height={50} align="center">
                </Image>
                    Buggy-Tracker
            </Title>

        </AppShell>
    );
}
export default Sidebar;