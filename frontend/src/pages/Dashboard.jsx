import React from 'react';
import ServerList from '../components/ServerList';
import VMManager from '../components/VMManager';

export default function Dashboard() {
  return (
    <>
      <ServerList />
      <hr />
      <VMManager />
    </>
  );
}