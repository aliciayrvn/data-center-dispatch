import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Input, message } from 'antd';

export default function VMManager() {
  const [vms, setVMs] = useState([
    { id: 1, name: 'VM-1', status: true },
    { id: 2, name: 'VM-2', status: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVMName, setNewVMName] = useState('');

  const handleStart = (id) => {
    setVMs(vms.map(vm => vm.id === id ? { ...vm, status: true } : vm));
    message.success('ВМ запущена');
  };

  const handleStop = (id) => {
    setVMs(vms.map(vm => vm.id === id ? { ...vm, status: false } : vm));
    message.info('ВМ остановлена');
  };

  const handleDelete = (id) => {
    setVMs(vms.filter(vm => vm.id !== id));
    message.warning('ВМ удалена');
  };

  const handleCreate = () => {
    if (!newVMName.trim()) return;
    setVMs([...vms, { id: Date.now(), name: newVMName, status: false }]);
    setNewVMName('');
    setIsModalOpen(false);
    message.success('ВМ создана');
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: status =>
        status ? <Tag color="green">🟢 Запущена</Tag> : <Tag color="red">🔴 Остановлена</Tag>,
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleStart(record.id)}
            disabled={record.status}
            size="small"
          >
            Запустить
          </Button>
          <Button
            onClick={() => handleStop(record.id)}
            disabled={!record.status}
            size="small"
          >
            Остановить
          </Button>
          <Button
            danger
            onClick={() => handleDelete(record.id)}
            size="small"
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>💻 Виртуальные машины</h2>
      <Button type="dashed" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
        Создать ВМ
      </Button>
      <Table
        columns={columns}
        dataSource={vms}
        rowKey="id"
        pagination={false}
        bordered
        style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 8 }}
      />
      <Modal
        title="Создать новую ВМ"
        open={isModalOpen}
        onOk={handleCreate}
        onCancel={() => setIsModalOpen(false)}
        okText="Создать"
        cancelText="Отмена"
      >
        <Input
          placeholder="Имя ВМ"
          value={newVMName}
          onChange={e => setNewVMName(e.target.value)}
          onPressEnter={handleCreate}
        />
      </Modal>
    </div>
  );
}