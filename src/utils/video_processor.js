
export const sortFileByTime = (fileHandles) =>
{
    let sorted_filehandle = fileHandles.sort((a, b) => a.name.localeCompare(b.name));
    if (!checkFileName(sorted_filehandle))
    {
        return;
    }
    return sorted_filehandle;
}

export const checkFileName = (fileHandles) =>
{
    if (!fileHandles)
    {
        console.log("fileHandles is null");
        return false;
    }

    const filenames = fileHandles.map(fileHandle => fileHandle.name);
    const pattern = /^(\w+)_(.+)_(\d{4}-\d{2}-\d{2}T\d{6})_(\d{4}-\d{2}-\d{2}T\d{6})\.mp4$/;
    for (let filename of filenames)
    {
        let match = filename.match(pattern);
        if (!match)
        {
            console.log("filename ", filename, "didn't match")
            return false;
        }
    }

    if (filenames.length == 1)
    {
        console.log("single");
        return true;
    }
    
    for (let i = 1; i < filenames.length; i++)
    {
        const prev_end_time = filenames[i - 1].split(/[_.]/)[3];
        const current_start_time = filenames[i].split(/[_.]/)[2];
        if (prev_end_time !== current_start_time)
        {
            console.log("not continue")
            return false;
        }
    }
    return true;

}



