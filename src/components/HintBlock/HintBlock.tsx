import React, {useRef, useState} from 'react';
import './HintBlock.scss';
import somePic from '../../resources/somePic.svg';
import loadFile from '../../resources/loadFile.svg';
import folderIcon from '../../resources/folderIcon.svg';
import trashIcon from '../../resources/trashIcon.svg';

interface HintsBlockProps {
    fileList: File[];
    onFileRemove: (index: number) => void;
    setFileList: (newFileList: File[]) => void
}

const HintsBlock: React.FC<HintsBlockProps> = ({ fileList, onFileRemove, setFileList }) => {
    // const [fileList, setFileList] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            // setLocalFileList([...fileList, ...filesArray]);
            setFileList([...fileList, ...filesArray]);
        }
    };

    //v1 удалить, если все будет хорошо на ифт
    // const handleClick = () => {
    //     const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
    //     if (fileInput) {
    //         fileInput.click();
    //     }
    // };

    // const handleClick = () => {
    //    if (fileInputRef.current) {
    //        fileInputRef.current.click();
    //    }
    // };
    const handleClick = () => {
        fileInputRef.current?.click();
    }

    return (
        <div className="hints-block">
            <h2>Прикрепленные файлы</h2>
            {fileList.length === 0 && <img src={somePic} alt="icon" className="placeholder" />}
            <div className="thumbnails">
                {fileList.map((file, index) => (
                    // <div key={index} className="thumbnail-container" >
                    //     <img
                    //         src={URL.createObjectURL(file)}
                    //         alt={file.name}
                    //         className="thumbnail"
                    //         onContextMenu={(event) => {
                    //             event.preventDefault();
                    //             onFileRemove(index);
                    //         }}
                    //     />
                    // </div>
                    <div key={index} className="thumbnail-container">
                        <img
                            src={folderIcon}
                            alt="file icon"
                            className="thumbnail-icon"
                        />
                        <span className="file-name">{file.name}</span>
                        <span className="remove-file" onClick={() => onFileRemove(index)}><img src={trashIcon} /></span>
                    </div>
                ))}
            </div>
            {/*v3*/}
            <div className="form-container" onClick={handleClick}>
                <label className="file-upload-button">
                    Прикрепить файлы
                    <input
                        type="file"
                        onChange={handleFileChange}
                        multiple
                        style={{ display: 'none' }} // hide the input field
                    />
                    <div className="svg-container">
                        <svg width="20" height="20" viewBox="0 0 23.9731 24" fill="none" xmlns="http://www.w3.org/2000/svg" pointerEvents="none">
                            <defs/>
                            <path id="path" d="M22.75 8.73L10.55 20.79C8.53 22.79 5.25 22.79 3.23 20.79C1.21 18.79 1.21 15.55 3.23 13.56L14.21 2.7C15.56 1.37 17.74 1.37 19.09 2.7C20.44 4.03 20.44 6.19 19.09 7.52L8.11 18.38C7.44 19.05 6.35 19.05 5.67 18.38C5 17.71 5 16.63 5.67 15.97L15.43 6.32L14.21 5.11L4.45 14.76C3.11 16.09 3.11 18.25 4.45 19.59C5.8 20.92 7.98 20.92 9.33 19.59L20.31 8.73C22.33 6.73 22.33 3.49 20.31 1.49C18.29 -0.5 15.01 -0.5 12.99 1.49L1.4 12.95L1.44 12.99C-0.66 15.67 -0.47 19.54 2.01 22C4.5 24.46 8.41 24.64 11.12 22.56L11.16 22.6L23.97 9.94L22.75 8.73Z" fill="#FFFFFF" fillOpacity="0.960000" fillRule="nonzero"/>
                        </svg>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default HintsBlock;
