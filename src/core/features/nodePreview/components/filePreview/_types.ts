export type ContentType = string | Blob;

export interface PreviewerProps {
  name: string;
  content: ContentType;
}

export type PreviewerType = (props: PreviewerProps) => JSX.Element;

export type PreviewersType = {
  [key: string]: PreviewerType;
};
