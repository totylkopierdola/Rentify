import { X } from 'lucide-react';
import { Input } from './ui/Input';
import { Label } from './ui/Label';

const ImageUpload = ({ onChange, previews }) => {
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    onChange(newFiles);
  };

  return (
    <div className=''>
      <Label htmlFor='pictures'>Pictures</Label>
      <Input id='pictures' type='file' multiple onChange={handleImageChange} />
      {previews.length > 0 && (
        <div className='flex flex-wrap gap-4'>
          {previews.map((preview, index) => (
            <div key={`${preview}-${index}`} className='relative'>
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className=' h-32 w-32 rounded object-cover'
              />
              <X className='absolute right-0 top-0 cursor-pointer shadow-2xl hover:scale-110 hover:text-red-500' />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
