import { buffers, eventChannel, END } from "redux-saga";

type HeadersType = Record<string, string>;

export function createUploadFileChannel({
  endpoint,
  file,
  headers
}: {
  endpoint: string;
  file: File;
  headers?: HeadersType;
}) {
  return eventChannel((emitter) => {
    const xhr = new XMLHttpRequest();

    const onProgress = (e: ProgressEvent) => {
      if (e.lengthComputable) {
        const progress = Math.floor((e.loaded / e.total) * 100);
        emitter({ progress });
      }
    };

    const onFailure = () => {
      emitter({ error: new Error("Upload failed") });
      emitter(END);
    };

    const onSuccess = () => {
      emitter({ success: true });
      emitter(END);
    };

    const onReadyStateChange = () => {
      // 4 = done
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        onSuccess();
      } else {
        onFailure();
      }
    };

    xhr.upload.addEventListener("progress", onProgress);
    xhr.upload.addEventListener("error", onFailure);
    xhr.upload.addEventListener("abort", onFailure);
    xhr.onreadystatechange = onReadyStateChange;

    xhr.open("POST", endpoint, true);

    addHeadersToRequest(xhr, headers);

    xhr.send(mapFileToFormData(file));

    return () => {
      xhr.upload.removeEventListener("progress", onProgress);
      xhr.upload.removeEventListener("error", onFailure);
      xhr.upload.removeEventListener("abort", onFailure);
      xhr.onreadystatechange = null;
      xhr.abort();
    };
  }, buffers.sliding(2));
}

function addHeadersToRequest(xhr: XMLHttpRequest, headers?: HeadersType): void {
  if (!headers) {
    return;
  }

  Object.entries(headers).forEach(([key, value]) =>
    xhr.setRequestHeader(key, value)
  );
}

function mapFileToFormData(file: File) {
  const bodyFormData = new FormData();
  bodyFormData.append("fileData", file);

  return bodyFormData;
}
