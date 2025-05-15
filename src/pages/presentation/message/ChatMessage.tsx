
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
    SubHeaderLeft,
    SubHeaderRight,
    SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Card, {
    CardBody,
    CardHeader,
    CardLabel,
    CardSubTitle,
    CardTitle,
} from '../../../components/bootstrap/Card';
import Chat, { ChatGroup, ChatHeader, ChatListItem } from '../../../components/Chat';
import USERS, { IUserProps } from '../../../common/data/usernishadummydata';
import OffCanvas, { OffCanvasBody, OffCanvasHeader } from '../../../components/bootstrap/OffCanvas';
import InputGroup from '../../../components/bootstrap/forms/InputGroup';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import { demoPagesMenu } from '../../../menu';
import CHATS, { IMessages } from '../../../common/data/Chatnishadummydata';
import CommonChatStatus from '../../_common/CommonChatStatus';

const ChatMessage = () => {
    const navigate = useNavigate();
    const [canvasStatus, setCanvasStatus] = useState<boolean>(false);
    const [newMessage, setNewMessage] = useState<string>(''); // State for new message
    const [chatMessages, setChatMessages] = useState<IMessages[]>([]); // State for chat messages

    const TABS: { [key: string]: IUserProps } = {
        ATHARVA: USERS.ATHARVA,
        AKHILESH: USERS.AKHILESH,
        RANJANA: USERS.AYUSHI,
        AYUSHI: USERS.RANJANA,
        TANUSHREE: USERS.TANUSHREE,
        NISHA: USERS.NISHA,
        MANTHAN: USERS.MANTHAN,
    };

    const [activeTab, setActiveTab] = useState<IUserProps | null>(USERS.ATHARVA);

    function getMessages(ACTIVE_TAB: IUserProps): IMessages[] {
        if (ACTIVE_TAB === USERS.ATHARVA) {
            return CHATS.ATHARVA_VS_RANJANA;
        }
        if (ACTIVE_TAB === USERS.AKHILESH) {
            return CHATS.RANJANA_VS_TANUSHREE;
        }
        if (ACTIVE_TAB === USERS.AYUSHI) {
            return CHATS.TANUSHREE_VS_NISHA;
        }
        if (ACTIVE_TAB === USERS.RANJANA) {
            return CHATS.TANUSHREE_VS_AYUSHI;
        }
        if (ACTIVE_TAB === USERS.TANUSHREE) {
            return CHATS.AYUSHI_VS_ATHARVA;
        }
        return []; // Ensure a default return value for all other cases
    }

    const getListShow = (TAB_NAME: IUserProps | null) => {
        setActiveTab(TAB_NAME);
        setCanvasStatus(true);
        if (TAB_NAME) {
            setChatMessages(getMessages(TAB_NAME)); // Load messages for the selected tab
        }
    };

    useEffect(() => {
        if (!canvasStatus) {
            setActiveTab(USERS.ATHARVA);
        }
    }, [canvasStatus]);

    const handleSendMessage = () => {
        if (newMessage.trim() && activeTab) {
            const newChatMessage: IMessages = {
                id: Date.now(), // Add a unique id for the message group
                messages: [{ id: Date.now(), message: newMessage }],
                user: {
                    ...USERS.YOUR_USER, // Replace with the current user's data
                    src: USERS.YOUR_USER?.src || '', // Ensure src is defined
                    srcSet: USERS.YOUR_USER?.srcSet || '', // Ensure srcSet is defined
                },
                isReply: false,
            };
            setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
            setNewMessage(''); // Clear the input field
        }
    };

    return (
        <PageWrapper title={demoPagesMenu.chat.subMenu.onlyListChat.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <span>
                        <Icon icon="Info" className="me-2" size="2x" color="danger" />
                        <span className="text-muted">
                            You have <Icon icon="Chat5" color="danger" className="mx-1" size="lg" />{' '}
                            14 unread messages.
                        </span>
                    </span>
                </SubHeaderLeft>
                <SubHeaderRight>
                    <CommonChatStatus />
                    <SubheaderSeparator />
                    <Button
                        icon="Logout"
                        color="danger"
                        isLight
                        onClick={() => navigate(`../${demoPagesMenu.login.path}`)}
                    >
                        Logout
                    </Button>
                </SubHeaderRight>
            </SubHeader>
            <Page>
                <div className="row h-100">
                    <div className="col-md-6">
                        <Card stretch>
                            <CardHeader>
                                <CardLabel icon="AccountCircle" iconColor="success">
                                    <CardTitle tag="div" className="h5">
                                        Online
                                    </CardTitle>
                                    <CardSubTitle tag="div" className="h6">
                                        3 users
                                    </CardSubTitle>
                                </CardLabel>
                            </CardHeader>
                            <CardBody>
                                <div className="row">
                                    <ChatListItem
                                        onClick={() => getListShow(TABS.ATHARVA)}
                                        isActive={activeTab === TABS.ATHARVA}
                                        src={TABS.ATHARVA.src}
                                        srcSet={TABS.ATHARVA.srcSet}
                                        name={TABS.ATHARVA.name}
                                        surname={TABS.ATHARVA.surname}
                                        isOnline={TABS.ATHARVA.isOnline}
                                        color={TABS.ATHARVA.color}
                                        lastSeenTime={dayjs().add(-1, 'week').fromNow()}
                                        latestMessage="I think it's really starting to shine."
                                    />
                                    <ChatListItem
                                        onClick={() => getListShow(TABS.RANJANA)}
                                        isActive={activeTab === TABS.RANJANA}
                                        src={TABS.RANJANA.src}
                                        srcSet={TABS.RANJANA.srcSet}
                                        name={TABS.RANJANA.name}
                                        surname={TABS.RANJANA.surname}
                                        isOnline={TABS.RANJANA.isOnline}
                                        color={TABS.RANJANA.color}
                                        unreadMessage={13}
                                        lastSeenTime={dayjs().add(-1, 'hour').fromNow()}
                                        latestMessage="Where are you?"
                                    />
                                    <ChatListItem
                                        onClick={() => getListShow(TABS.AYUSHI)}
                                        isActive={activeTab === TABS.AYUSHI}
                                        src={TABS.AYUSHI.src}
                                        srcSet={TABS.AYUSHI.srcSet}
                                        name={TABS.AYUSHI.name}
                                        surname={TABS.AYUSHI.surname}
                                        isOnline={TABS.AYUSHI.isOnline}
                                        color={TABS.AYUSHI.color}
                                        unreadMessage={1}
                                        lastSeenTime={dayjs().add(-3, 'hour').fromNow()}
                                        latestMessage="I am on Leave."
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-6">
                        <Card stretch>
                            <CardHeader>
                                <CardLabel icon="AccountCircle" iconColor="danger">
                                    <CardTitle tag="div" className="h5">
                                        Offline
                                    </CardTitle>
                                    <CardSubTitle tag="div" className="h6">
                                        3 users
                                    </CardSubTitle>
                                </CardLabel>
                            </CardHeader>
                            <CardBody>
                                <div className="row">
                                    <ChatListItem
                                        onClick={() => getListShow(TABS.TANUSHREE)}
                                        isActive={activeTab === TABS.TANUSHREE}
                                        src={TABS.TANUSHREE.src}
                                        srcSet={TABS.TANUSHREE.srcSet}
                                        name={TABS.TANUSHREE.name}
                                        surname={TABS.TANUSHREE.surname}
                                        isOnline={TABS.TANUSHREE.isOnline}
                                        color={TABS.TANUSHREE.color}
                                        lastSeenTime={dayjs().add(-3, 'day').fromNow()}
                                        latestMessage="What are you doing?"
                                    />
                                    <ChatListItem
                                        onClick={() => getListShow(TABS.NISHA)}
                                        isActive={activeTab === TABS.NISHA}
                                        src={TABS.NISHA.src}
                                        srcSet={TABS.NISHA.srcSet}
                                        name={TABS.NISHA.name}
                                        surname={TABS.NISHA.surname}
                                        isOnline={TABS.NISHA.isOnline}
                                        color={TABS.NISHA.color}
                                        lastSeenTime={dayjs().fromNow()}
                                        latestMessage="I don't get it."
                                    />
                                    <ChatListItem
                                        onClick={() => getListShow(TABS.MANTHAN)}
                                        isActive={activeTab === TABS.MANTHAN}
                                        src={TABS.MANTHAN.src}
                                        srcSet={TABS.MANTHAN.srcSet}
                                        name={TABS.MANTHAN.name}
                                        surname={TABS.MANTHAN.surname}
                                        isOnline={TABS.MANTHAN.isOnline}
                                        color={TABS.MANTHAN.color}
                                        lastSeenTime={dayjs().add(-5, 'week').fromNow()}
                                        latestMessage="Let's party"
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                <OffCanvas
                    id="chat"
                    isOpen={canvasStatus}
                    setOpen={setCanvasStatus}
                    placement="end"
                    isModalStyle
                    isBackdrop={false}
                    isBodyScroll
                >
                    <OffCanvasHeader setOpen={setCanvasStatus} className="fs-5">
                        <ChatHeader
                            to={
                                activeTab && activeTab.name && activeTab.surname
                                    ? `${activeTab.name} ${activeTab.surname}`
                                    : 'Unknown User'
                            }
                        />
                    </OffCanvasHeader>
                    <OffCanvasBody>
                        <Chat>
                            {chatMessages.map((msg, index) => (
                                <ChatGroup
                                    key={index}
                                    messages={msg.messages}
                                    user={msg.user}
                                    isReply={msg.isReply}
                                />
                            ))}
                        </Chat>
                    </OffCanvasBody>
                    <div className="chat-send-message p-3">
                        <InputGroup>
                            <Textarea
                                value={newMessage}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setNewMessage(e.target.value)
                                }
                            />
                            <Button color="info" icon="Send" onClick={handleSendMessage}>
                                SEND
                            </Button>
                        </InputGroup>
                    </div>
                </OffCanvas>
            </Page>
        </PageWrapper>
    );
};

export default ChatMessage;