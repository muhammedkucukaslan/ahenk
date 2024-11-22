'use client';

import * as React from 'react';
import { format } from 'date-fns';

import { cn } from '@/src/utils';
import { SelectSingleEventHandler } from 'react-day-picker';

import { tr } from 'date-fns/locale';
import { CalendarDays } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Calendar } from './calendar';

type DatePickerProps = {
  selected?: Date;
  onSelect?: SelectSingleEventHandler;
  placeholder?: string;
};

export function DatePicker({
  selected,
  onSelect,
  placeholder,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal bg-transparent',
            !selected && 'text-secondary-content'
          )}
        >
          <CalendarDays className='mr-2 h-4 w-4' />
          {selected ? (
            format(selected, 'PPP', {
              locale: tr,
            })
          ) : (
            <span>{placeholder ? placeholder : 'Tarih seçin'}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={selected}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
