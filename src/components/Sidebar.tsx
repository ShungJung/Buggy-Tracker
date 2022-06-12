import { BackgroundImage, Image, Navbar, Text, useMantineTheme, Tooltip, Button } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faDiagramProject, faTicket, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BuggyLogo from '../../images/BuggyLogo.svg';
const Sidebar = () => {
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
    return (
        <Navbar
            hiddenBreakpoint="sm"
            width={{ sm: 300, lg: 200 }}
        >
            <Navbar.Section>
                 <Image src={BuggyLogo} width={48} height={48}></Image>
            </Navbar.Section>
            <Navbar.Section grow mt="lg">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Text component={Link} variant="link" to="/projects">
                        
                        <Tooltip 
                            label="Projects"
                            color="black" 
                            withArrow
                            >
                            <Button variant="filled" color='blue' size='xl'>
                                <FontAwesomeIcon icon={faDiagramProject} size="3x" color="black" />
                            </Button>
                        </Tooltip>                   
                     </Text>
                    <Text component={Link} variant="link" to="/issue">
                        
                        <Tooltip
                            label="Issues"
                            color="black"
                            withArrow
                            >
                            <Button variant='filled' color='yellow' size='xl'>
                                <FontAwesomeIcon icon={faTicket} size="3x" color="black" />
                            </Button>
                        </Tooltip>
                    </Text>
                    <Text component={Link} variant="link" to="/createIssue">
                       
                        <Tooltip
                            label="CreateIssue"
                            color="black"
                            withArrow
                            >
                            <Button variant="filled" color='green' size="sm">
                                 <FontAwesomeIcon icon={faPlus} size="3x" color="black" />
                            </Button>
                        </Tooltip>
                    </Text>
                </div>
            </Navbar.Section>
            <Navbar.Section>
                <text>SJ</text>
            </Navbar.Section>
        </Navbar>
        
    )
}

export default Sidebar;