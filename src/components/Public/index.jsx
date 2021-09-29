import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { getTagList, getCategoryList } from '@/store/articles/actions'
import SignModal from './SignModal/SignModal';

const PublicComponent = props =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCategoryList());
        dispatch(getTagList())
    },[])
    return (
        <>
        <SignModal />
        </>
    )
}
export default PublicComponent