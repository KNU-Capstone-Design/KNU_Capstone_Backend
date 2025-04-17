

// 사용자 정보를 조회 컨트롤러
export const getInfo = async (req, res) => {

    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}