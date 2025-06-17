import React from 'react';
import { useNavigate } from 'react-router-dom';
import { demoPagesMenu } from '../../../../menu';
import UserContact from '../../../../components/UserContact';

const CommonDashboardUserCard = () => {
    const navigate = useNavigate();

    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (!currentUser) return <div>No user logged in</div>;

    return (
        <UserContact
            name={`${currentUser.name} ${currentUser.surname}`}
            position={currentUser.position || 'Team Member'}
            mail={currentUser.email || `${currentUser.username}@site.com`}
            phone={currentUser.phone || '1234567'}
            onChat={() => navigate(`../${demoPagesMenu.chat.subMenu.withListChat.path}`)}
            src={currentUser.src}
            srcSet={currentUser.srcSet}
            color={currentUser.color}
        />
    );
};

export default CommonDashboardUserCard;
