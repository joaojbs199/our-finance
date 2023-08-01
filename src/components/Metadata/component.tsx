import { IMetadata } from '@/src/integration/data/models/apiResponse/base/interfaces';
import { isValid } from '@/src/utils/validators';

interface IMetadataProps {
  metadata: IMetadata;
}

export const Metadata = ({ metadata }: IMetadataProps) => {
  return (
    <div className="flex h-9 w-full items-center justify-center bg-neutral-900 sm:justify-start sm:pl-4">
      {isValid(metadata.totalResults) && (
        <p className="text-center font-poppins text-xs font-light tracking-widest text-gray-50">{`Encontramos ${metadata.totalResults} resultados`}</p>
      )}
    </div>
  );
};
