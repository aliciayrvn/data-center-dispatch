import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';

export default function LoginForm({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Мок-логика: логин admin, пароль 1234
    setTimeout(() => {
      setLoading(false);
      if (values.username === 'admin' && values.password === '1234') {
        onLogin();
      } else {
        message.error('Неверный логин или пароль');
      }
    }, 700);
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