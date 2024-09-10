import { useRef, useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { Button } from '@components/ui/button';
import { Avatar, AvatarImage } from '@/shadecn/components/ui/avatar';

interface IMainCoverUploadProps {
  title?: string;
  hint?: string;
  textButton: JSX.Element | string;
  field?: ControllerRenderProps<FieldValues, string>;
  disabled?: boolean;
}

export default function ImgUpload({ field, textButton }: IMainCoverUploadProps): React.ReactNode {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        field?.onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-2">
      <Avatar
        className="flex h-40 w-full items-center justify-center rounded-lg border bg-neutral-100"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        {field?.value ? (
          <>
            <AvatarImage src={field?.value} className="object-cover" />
            {isHovering && (
              <button
                type="button"
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 text-white"
                onClick={openFileSelector}>
                <span>Change Image</span>
              </button>
            )}
          </>
        ) : (
          <Button
            className="h-0 w-fit p-0 text-sm text-blue-500 underline"
            type="button"
            variant="secondary"
            onClick={openFileSelector}>
            {textButton}
          </Button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="imageUpload"
        />
      </Avatar>
    </div>
  );
}
