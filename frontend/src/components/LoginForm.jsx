import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import API from '../api';

export default function LoginForm({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('username', values.username);
      params.append('password', values.password);
      const res = await API.post('/auth/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      localStorage.setItem('token', res.data.access_token);
      onLogin();
    } catch (e) {
      message.error('Неверный логин или пароль');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card title="Вход в систему" style={{ width: 350 }}>
        <Form name="login" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Введите логин!' }]}>
            <Input placeholder="Логин" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль!' }]}>
            <Input.Password placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}