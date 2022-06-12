import { BackgroundImage, Image, Navbar, Text, useMantineTheme, Tooltip, Button, Center } from '@mantine/core';
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
            width={{ sm: 256, lg: 256 }}
        >
            <Navbar.Section>
                 

            </Navbar.Section>
            <Navbar.Section grow mt="lg">
                <div style={{ display: "flex", flexDirection: "column" }}>

                    <Text component={Link} variant="link" to="/">
                    <Button variant="filled" color='white' size='xs' styles={{
                        root: {
                            backgroundColor: "unset"
                        }}
                    }  >
                        
                        <Image src={BuggyLogo} width={50} height={50}  ></Image>
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

                    <Text component={Link} variant="link" to="/issue">
                        
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
                    <Text component={Link} variant="link" to="/createIssue">
                       
                        <Tooltip
                            label="CreateIssue"
                            color="black"
                            withArrow
                            >
                            <Button variant="filled" color='green' size="xs">
                                 <FontAwesomeIcon icon={faPlus} size="2x" color="black" align="left" />
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