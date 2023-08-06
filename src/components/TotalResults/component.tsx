import { IMetadata } from '@/src/integration/data/models/apiResponse/base/interfaces';
interface IMetadataProps {
  metadata: IMetadata;
}

export const Metadata = ({ metadata }: IMetadataProps) => {
  return (
    <p className="text-center font-poppins text-xs font-light tracking-widest text-gray-50">{`Encontramos ${metadata.totalResults} resultados`}</p>
  );
};
