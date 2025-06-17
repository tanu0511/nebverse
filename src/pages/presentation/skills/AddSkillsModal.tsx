import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface AddSkillsModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (skills: string[]) => void;
  initialSkills?: string[];
}

const AddSkillsModal: React.FC<AddSkillsModalProps> = ({
  isOpen,
  setIsOpen,
  onSave,
  initialSkills,
}) => {
  const [skillInputs, setSkillInputs] = useState<string[]>(['']);

  // Set initial skills when editing
  useEffect(() => {
    if (isOpen && initialSkills && initialSkills.length > 0) {
      setSkillInputs(initialSkills);
    } else if (isOpen) {
      setSkillInputs(['']);
    }
  }, [isOpen, initialSkills]);

  const handleSkillInputChange = (idx: number, value: string) => {
    setSkillInputs((prev) => prev.map((v, i) => (i === idx ? value : v)));
  };

  const handleAddMore = () => {
    setSkillInputs((prev) => [...prev, '']);
  };

  const handleSaveSkills = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newSkills = skillInputs
      .map((name) => name.trim())
      .filter((name) => name);
    if (newSkills.length > 0) {
      onSave(newSkills);
    }
    setSkillInputs(['']);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSkillInputs(['']);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg" isStaticBackdrop>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="add-skills-modal-title">Add Skills</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Card className="mb-0">
          <CardBody>
            <h4 className="mb-4">Create New</h4>
            <form onSubmit={handleSaveSkills}>
              {skillInputs.map((input, idx) => (
                <div key={idx} className={idx > 0 ? 'mt-3' : ''}>
                  <FormGroup label={idx === 0 ? 'Skill *' : ''}>
                    <Input
                      value={input}
                      placeholder="Skill Name"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSkillInputChange(idx, e.target.value)}
                      required={idx === 0}
                    />
                  </FormGroup>
                </div>
              ))}
              <Button
                color="link"
                type="button"
                className="ps-0 mt-2"
                onClick={handleAddMore}
              >
                <Icon icon="Add" className="me-1" />
                Add More
              </Button>
              <div className="mt-4">
                <Button color="primary" type="submit" className="me-2">
                  <Icon icon="Check" className="me-1" />
                  Save
                </Button>
                <Button color="light" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default AddSkillsModal;