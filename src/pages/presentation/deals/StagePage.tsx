/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import SubHeader, {
    SubHeaderLeft,
    SubHeaderRight,
    SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Icon from '../../../components/icon/Icon';
import COLORS from '../../../common/data/enumColors';
import Button from '../../../components/bootstrap/Button';
import {ButtonGroup} from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import { TCards, TColumnsData } from '../project-management/type/types';
import { move, reorder } from '../project-management/helper/helper';
import Board from '../project-management/component/Board';
import Columns from '../project-management/component/Columns';
import AddDealStageModal from './AddDealStageModal';
import CreateProposalModal from './CreateProposalModal';
import AddSatgeData from './AddStage.json'; // adjust path if needed

const StagePage = () => {
    const { darkModeStatus } = useDarkMode();
    const navigate = useNavigate();
    const [isAddStageOpen, setIsAddStageOpen] = useState(false);
    const [isProposalOpen, setIsProposalOpen] = useState(false);
    const [editStageData, setEditStageData] = useState<any>(null);
    const [editStageColumnKey, setEditStageColumnKey] = useState<string | null>(null);

    // Load columns from JSON
    const [columnsData, setColumnsData] = useState<TColumnsData>({});
    const [state, setState] = useState<TCards>({});

    useEffect(() => {
        const columns: TColumnsData = {};
        const cards: TCards = {};
        AddSatgeData.AddStage.forEach((stage, idx) => {
            if (!stage.id || !stage.title) return; // skip invalid
            columns[stage.id] = { // use stage.id as key!
                id: stage.id,
                title: stage.title,
                color: stage.color,
                icon: 'Circle',
            };
            cards[stage.id] = [];
        });
        setColumnsData(columns);
        setState(cards);
    }, []);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId) {
            const ITEMS = reorder(state[source.droppableId], source.index, destination.index);
            const sourceList = source.droppableId;
            setState({ ...state, [sourceList]: ITEMS });
        } else {
            const RESULT = move(
                state[source.droppableId],
                state[destination.droppableId],
                source,
                destination,
            );
            setState({
                ...state,
                ...RESULT,
            });
        }
    };

    const handleAddStageSave = async (data: { pipeline: string; dealStage: string; labelColor: string }) => {
        if (editStageData && editStageColumnKey) {
            // Edit mode: update UI
            setColumnsData(prev => ({
                ...prev,
                [editStageColumnKey]: {
                    ...prev[editStageColumnKey],
                    title: data.dealStage,
                    color: data.labelColor,
                },
            }));

            // Update on JSON server
            await fetch(`http://localhost:4001/AddStage/${editStageData.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: data.dealStage,
                    color: data.labelColor,
                }),
            });

            setEditStageData(null);
            setEditStageColumnKey(null);
        } else {
            // Add mode (your existing logic)
            const newStage = {
                title: data.dealStage,
                color: data.labelColor,
                deals: 0,
                value: 0,
                id: Math.random().toString(16).slice(2),
            };
            // Update UI first
            setColumnsData((prev) => ({
                ...prev,
                [newStage.id]: {
                    id: newStage.id,
                    title: data.dealStage,
                    color: data.labelColor,
                    icon: 'Add',
                },
            }));
            setState(prev => ({
                ...prev,
                [newStage.id]: [],
            }));
            // Then send to server (don't await if you don't need to handle errors immediately)
            fetch('http://localhost:4001/AddStage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStage),
            });
        }
    };

    const handleDeleteColumn = async (columnKey: string, columnData: any) => {
        setColumnsData(prev => {
            const newData = { ...prev };
            delete newData[columnKey];
            return newData;
        });
        setState(prev => {
            const newState = { ...prev };
            delete newState[columnKey];
            return newState;
        });
        // Also delete from JSON server
        if (columnData.id) {
            await fetch(`http://localhost:4001/AddStage/${columnData.id}`, {
                method: 'DELETE',
            });
        }
    };

    return (
        <PageWrapper title={demoPagesMenu.projectManagement.subMenu.item.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
                        Back to List
                    </Button>
                    <SubheaderSeparator />
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button
                        icon="Add"
                        color="primary"
                        isLight
                        onClick={() => setIsProposalOpen(true)}
                    >
                        Add Deal
                    </Button>
                    <Button
                        icon="Add"
                        color="primary"
                        isLight
                        onClick={() => setIsAddStageOpen(true)}
                    >
                        Add Stage
                    </Button>
                     <ButtonGroup>
                  <Button
                    color="info" isLight
                    // isLight
                    // icon="ViewList"
                    onClick={() => navigate('/leads/deals')}
                  >
                    <Icon icon="List"/>
                  </Button>

          <Button
            color="info"
            isLight
            // icon="ViewModule"
            onClick={() => navigate('/deals/stage')}
          >
            <Icon icon="Assessment"/>
          </Button>
              
            </ButtonGroup>
  
                </SubHeaderRight>
            </SubHeader>
            <Page container='fluid'>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Board>
                        <Columns
                            columnsData={columnsData}
                            cardsData={state}
                            setCardsData={setState}
                            onCreateProposal={() => setIsProposalOpen(true)}
                            onEditStage={(columnKey, columnData) => {
                                setEditStageData({
                                    pipeline: '',
                                    dealStage: columnData.title,
                                    labelColor: columnData.color,
                                    id: columnData.id,
                                });
                                setEditStageColumnKey(columnKey);
                                setIsAddStageOpen(true);
                            }}
                            onDeleteColumn={handleDeleteColumn}
                        />
                    </Board>
                </DragDropContext>
            </Page>
            <AddDealStageModal
                isOpen={isAddStageOpen}
                setIsOpen={setIsAddStageOpen}
                onSave={handleAddStageSave}
                initialData={editStageData}
            />
            <CreateProposalModal
                isOpen={isProposalOpen}
                setIsOpen={setIsProposalOpen}
                onSave={(dealData) => {
                    // Find the column key by matching the stage title
                    const stageTitle = dealData.dealStages;
                    const columnKey = Object.keys(columnsData).find(
                        key => columnsData[key].title === stageTitle
                    ) || Object.keys(columnsData)[0]; // fallback to first column

                    // Create a card object with a unique id and required fields
                    const card = {
                        ...dealData,
                        id: `deal_${Date.now()}`,
                        title: dealData.deal,
                        user: { username: dealData.leadContacts },
                        description: dealData.description,
                        value: dealData.dealValue,
                    };

                    // Add the card to the correct column in the board state
                    setState(prev => ({
                        ...prev,
                        [columnKey]: [...prev[columnKey], card],
                    }));

                    // ---- ADD THIS: Save to localStorage for Deals.tsx ----
                    const deals = JSON.parse(localStorage.getItem('deals') || '[]');
                    deals.push({
                        deals: dealData.deal,
                        contactName: dealData.leadContacts,
                        dealStages: dealData.dealStages,
                        dealValue: dealData.dealValue,
                        validTill: dealData.validTill,
                        status: dealData.requireSignature ? 'Pending Signature' : 'Completed',
                        proposalData: dealData,
                        // add other fields as needed
                     });
                    localStorage.setItem('deals', JSON.stringify(deals));
                    // ------------------------------------------------------

                    setIsProposalOpen(false);
                }}
            />
        </PageWrapper>
    );
};

export default StagePage;
