import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
// react-dropzone to provide drag-and-drop file uploading functionality and accepts .jpeg and .png file formats. 
// useDropzone for upload management.


interface ImageUploadProps{
    value?: string; //initial base64 string representing the uploaded image
    disabled?: boolean;
    onChange: (base64: string) => void; //required
    label: string; //required
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    value, 
    disabled, 
    onChange, 
    label
}) => {

    // store the base64 string of the uploaded image
    const [base64, setBase64] = useState(value); //could be pre-filled if an image has already been uploaded.
    
    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange]);

    const handleDrop = useCallback((files: any) => {
        const fileDropped = files[0]; //seelct the first dropped file
        const reader = new FileReader(); //from js. read the file

        reader.onload = (event: any) => { //event
            setBase64(event.target.result); //convert the file into a base64-encoded string
            handleChange(event.target.result); //pass it to onChange then pass to parent cpmponent. 
            //handleChange->onChange->parentComponent(EditModal).
        }
        reader.readAsDataURL(fileDropped);
    }, [handleChange]);


    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1, //limits the user to upload only one file.
        onDrop: handleDrop, //function to be called when a file is dropped into the zone.
        disabled, //disables the dropzone if the disabled prop is true.
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    });


    return(
        <>
        <div 
            { ... getRootProps({
                className: "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700"
            })}>
                <input { ...getInputProps()}/>
                {
                    base64 ? (
                        <div className="flex items-center justify-center">
                            <Image 
                                src={base64}
                                height="100"
                                width="100"
                                alt="Uploaded image"
                            />
                        </div>
                    ) : (
                        <p className="text-white">
                            {label}
                        </p>
                    
                    )
                }
        </div>
 
        </>
    )
};

export default ImageUpload;
