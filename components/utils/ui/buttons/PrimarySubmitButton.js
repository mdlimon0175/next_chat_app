"use client"
export default function PrimarySubmitButton({ title, disabled }) {
    return (
        <div>
            <button disabled={disabled} type="submit" className="auth_btn">
                {title}
            </button>
        </div>
    );
}