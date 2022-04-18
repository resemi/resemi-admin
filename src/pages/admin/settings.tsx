import React from 'react';
import { BasicLayout } from '@/layouts/default';

export default function Page() {
  return (
    <BasicLayout>
      <div className="p-25px text-red-400 dark:text-green-400">Settings</div>
      <div className="hover:(bg-gray-400 font-medium) bg-white font-light">asdasdsadsadsa</div>

      <button type="button" className="btn btn-green">
        Button
      </button>
    </BasicLayout>
  );
}
