'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ActionIcon,
  Empty,
  SearchNotFoundIcon,
  Button,
  Title,
  Input,
  cn,
} from 'rizzui';
import {
  PiFileTextDuotone,
  PiMagnifyingGlassBold,
  PiXBold,
} from 'react-icons/pi';
import { pageLinks } from './page-links.data';
import { routes } from '@/config/routes';

interface SearchItem {
  title: string;
  href: string;
}

const searchItems: SearchItem[] = [
  // { title: 'Profile Settings', href: routes.view.profile },
  //   { title: 'Notification Preferences', href: routes.notificationPreference },
  { title: 'Personal Information', href: routes.profile.personalInformation },
  // { title: 'Newsletter', href: routes.newsletter },
];

export default function SearchList({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4 md:p-6">
      <div className="grid gap-4">
        {searchItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onClose}
          >
            <span className="ml-3">{item.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
