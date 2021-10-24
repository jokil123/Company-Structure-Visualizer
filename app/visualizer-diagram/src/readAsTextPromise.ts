export const readPromise = (f: any): Promise<string | ArrayBuffer> => {
  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(f);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onabort = reject;
    reader.onerror = reject;
  });
};
