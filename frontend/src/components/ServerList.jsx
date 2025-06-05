import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Space, Modal, message } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import API from '../api';

export default function ServerList() {
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await API.get('/servers/');
        setServers(res.data);
      } catch (e) {
        setServers([
          { id: 1, name: 'Server-1', status: true, cpu_load: 23, ram_usage: 45, temperature: 60, ip: '192.168.1.10', os: 'Ubuntu 22.04', uptime: '5 дней' },
          { id: 2, name: 'Server-2', status: false, cpu_load: 0, ram_usage: 0, temperature: 0, ip: '192.168.1.11', os: 'Windows Server 2019', uptime: '—' },
          { id: 3, name: 'Server-3', status: true, cpu_load: 67, ram_usage: 80, temperature: 75, ip: '192.168.1.12', os: 'CentOS 8', uptime: '12 часов' },
        ]);
      }
    };
    fetchServers();
  }, []);

  const handlePowerOn = (id) => {
    setServers(servers.map(s => s.id === id ? { ...s, status: true } : s));
    message.success('Сервер включён');
  };

  const handlePowerOff = (id) => {
    setServers(servers.map(s => s.id === id ? { ...s, status: false, cpu_load: 0, ram_usage: 0, temperature: 0 } : s));
    message.info('Сервер выключен');
  };

  const handleReboot = (id) => {
    message.loading({ content: 'Перезагрузка...', key: 'reboot' });
    setTimeout(() => {
      message.success({ content: 'Сервер перезагружен', key: 'reboot', duration: 2 });
      // Можно добавить сброс нагрузки, если нужно
    }, 1500);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Удалить сервер?',
      content: 'Вы уверены, что хотите удалить этот сервер?',
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        setServers(servers.filter(s => s.id !== id));
        message.warning('Сервер удалён');
      }
    });
  };

  const handleShowInfo = (server) => {
    setSelectedServer(server);
    setInfoModalOpen(true);
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <span>
          <img
            src="/chest.png"
            alt="chest"
            style={{ width: 22, verticalAlign: 'middle', marginRight: 8 }}
          />
          {text}
        </span>
      ),
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'ОС',
      dataIndex: 'os',
      key: 'os',
    },
    {
      title: 'Аптайм',
      dataIndex: 'uptime',
      key: 'uptime',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: status =>
        status ? <Tag color="green">🟢 Включен</Tag> : <Tag color="red">🔴 Выключен</Tag>,
    },
    {
      title: 'CPU (%)',
      dataIndex: 'cpu_load',
      key: 'cpu_load',
    },
    {
      title: 'RAM (%)',
      dataIndex: 'ram_usage',
      key: 'ram_usage',
    },
    {
      title: 'Температура (°C)',
      dataIndex: 'temperature',
      key: 'temperature',
      render: (temperature) => (
        temperature > 0 ? `${temperature}°C` : 'недоступно'
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => handleShowInfo(record)}>
            Подробнее
          </Button>
          {record.status ? (
            <Button size="small" onClick={() => handlePowerOff(record.id)}>
              Выключить
            </Button>
          ) : (
            <Button size="small" type="primary" onClick={() => handlePowerOn(record.id)}>
              Включить
            </Button>
          )}
          <Button size="small" onClick={() => handleReboot(record.id)}>
            Перезагрузить
          </Button>
          <Button size="small" danger onClick={() => handleDelete(record.id)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>🖥️ Серверы</h2>
      <Table
        columns={columns}
        dataSource={servers}
        rowKey="id"
        pagination={false}
        bordered
        style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 8 }}
      />
      <h3 style={{ marginTop: 32 }}>График загрузки серверов</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={servers}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cpu_load" fill="#1890ff" name="CPU (%)" />
          <Bar dataKey="ram_usage" fill="#52c41a" name="RAM (%)" />
          <Bar dataKey="temperature" fill="#faad14" name="Температура (°C)" />
        </BarChart>
      </ResponsiveContainer>
      <Modal
        title={selectedServer ? `Информация о сервере ${selectedServer.name}` : ''}
        open={infoModalOpen}
        onCancel={() => setInfoModalOpen(false)}
        footer={null}
      >
        {selectedServer && (
          <div>
            <p><b>IP-адрес:</b> {selectedServer.ip}</p>
            <p><b>ОС:</b> {selectedServer.os}</p>
            <p><b>Аптайм:</b> {selectedServer.uptime}</p>
            <p><b>CPU:</b> {selectedServer.cpu_load}%</p>
            <p><b>RAM:</b> {selectedServer.ram_usage}%</p>
            <p><b>Температура:</b> {selectedServer.temperature > 0 ? `${selectedServer.temperature}°C` : 'недоступно'}</p>
            <p><b>Статус:</b> {selectedServer.status ? 'Включен' : 'Выключен'}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}