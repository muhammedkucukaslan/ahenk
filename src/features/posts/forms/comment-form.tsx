import DynamicFormField, {
  FormFieldType,
} from '@/src/components/global/dynamic-form-field';
import { Form } from '@/src/components/ui/form';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Button } from '@/src/components/ui/button';
import { Smile } from 'lucide-react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  comment: yup.string().required('Yorum alanı boş bırakılamaz.'),
});

const CommentForm = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function useClickOutside(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setShowEmojiPicker(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: '',
    },
  });
  const wrapperRef = React.useRef(null);

  useClickOutside(wrapperRef);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='p-4 border-t flex gap-2'
      >
        <DynamicFormField
          control={form.control}
          name='comment'
          fieldType={FormFieldType.INPUT}
          placeholder='Yorum ekleyin...'
        />

        <div ref={wrapperRef} className='relative'>
          <Button
            type='button'
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            variant='ghost'
            size={'icon'}
          >
            <Smile size={18} />
          </Button>

          <EmojiPicker
            skinTonesDisabled
            open={showEmojiPicker}
            onEmojiClick={(emojiObject: EmojiClickData) => {
              form.setValue(
                'comment',
                `${form.getValues('comment')}${emojiObject.emoji}`
              );
            }}
            style={{
              position: 'absolute',
              top: '50px',
              right: '0px',
            }}
          />
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
