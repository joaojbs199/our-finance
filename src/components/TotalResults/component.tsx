import { IMetadata } from '@/src/integration/data/models/apiResponse/base/interfaces';
import { isValid } from '@/src/utils/validators';

interface IMetadataProps {
  metadata: IMetadata;
}

export const Metadata = ({ metadata }: IMetadataProps) => {
  return (
    <>
      {isValid(metadata.totalResults) && (
        <p className="text-center font-poppins text-xs font-light tracking-widest text-gray-50">{`Encontramos ${metadata.totalResults} resultados`}</p>
      )}
    </>
  );
};
