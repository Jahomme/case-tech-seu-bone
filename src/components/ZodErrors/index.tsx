import { ErrorBox } from './styled';

export function ZodErrors({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <ErrorBox key={index}>{err}</ErrorBox>
  ));
}
