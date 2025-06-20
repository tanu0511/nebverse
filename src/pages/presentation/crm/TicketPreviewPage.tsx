import React from 'react';
import TicketPreviewForm from '../ticket/TicketPreviewForm';

const TicketPreviewPage = () => {
  // Provide dummy data or fetch from API as needed
  const types = [{ id: '1', name: 'Bug' }, { id: '2', name: 'Feature' }];
  const priorities = ['Low', 'Medium', 'High'];
  const groups = [{ id: '1', name: 'Support' }, { id: '2', name: 'Sales' }];

  return (
    <div className="container py-4">
      <TicketPreviewForm
        types={types}
        priorities={priorities}
        groups={groups}
        showDescription={true}
        showType={true}
        showPriority={true}
        onSubmit={`data => console.log('Submitted:', data)`}
      />
    </div>
  );
};

export default TicketPreviewPage;