declare module "react-file-previewer" {
  interface FileProps {
    data?: string | ArrayBuffer;
    url?: string | ArrayBuffer;
    mimeType: string;
    name: string;
  }

  interface Props {
    file: FileProps;
  }

  const ReactFileViewer: (props: Props) => JSX.Element;

  export default ReactFileViewer;
}
