
const createNote = async (req,res) => {
    try{
        const {title,content,category,isPinned} = req.body;
        if(!title || !content || !category || !isPinned){
            return res.status(400).json({
                message : "Title and content are required",
            });
        }
        const note = await Note.create({title,content,category,isPinned});
        res.status(201).json({
            message : "Note created successfully",
            data : note,
        });
    }
    catch(error){
        res.status(500).json({
            message : "Server error",
            error : error.message,
        });
    }
}
module.exports = createNote;