import * as React from 'react'

interface IPost {
    id: number
    title: string
    body: string
}

type Props = {
    savePost: (e: React.FormEvent, formData: IPost) => void
}

export default function AddPost({ savePost }: Props) {
    const [formData, setFormData] = React.useState<IPost>()

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    return (
        <form className='Form' onSubmit={(e) => savePost(e, formData)}>
            <div>
                <div className='Form--field'>
                    <label htmlFor='name'>Title</label>
                    <input onChange={handleForm} type='text' id='title' />
                </div>
                <div className='Form--field'>
                    <label htmlFor='body'>Description</label>
                    <input onChange={handleForm} type='text' id='body' />
                </div>
            </div>
            <button
                className='Form__button'
                disabled={formData === undefined ? true : false}
            >
                Add Post
            </button>
        </form>
    )
}
