import { useContext, useState } from 'react';
import { AuthContext, api } from '../context/AuthContext';

function Profile() {
    const { user, updateUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        department: user?.department || '',
        year: user?.year || '',
        age: user?.age || ''
    });
    const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.patch('/updateuser', formData);
            updateUser({ ...user, ...data });
            setStatusMsg({ text: 'Profile updated successfully!', type: 'success' });
        } catch (err) {
            setStatusMsg({ text: err.response?.data?.message || 'Update failed', type: 'error' });
        }
    };

    return (
        <div className="min-h-screen bg-background pb-12 flex flex-col items-center pt-10">
            <div className="max-w-2xl w-full px-4 space-y-6">

                {/* Read-only profile card */}
                <div className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
                    <h2 className="text-2xl font-bold text-foreground mb-6">User Profile Overview</h2>
                    <div className="space-y-4 text-sm md:text-base">
                        <div className="flex justify-between border-b border-border pb-3">
                            <span className="text-muted-foreground">Username</span>
                            <span className="text-foreground font-medium">{user?.username}</span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-3">
                            <span className="text-muted-foreground">Email</span>
                            <span className="text-foreground font-medium">{user?.email}</span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-3">
                            <span className="text-muted-foreground">UserID</span>
                            <span className="text-foreground font-mono bg-secondary px-2 rounded">{user?.userId}</span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-3">
                            <span className="text-muted-foreground">Database ID</span>
                            <span className="text-foreground font-mono text-xs opacity-60">{user?._id}</span>
                        </div>
                    </div>
                </div>

                {/* Edit profile form */}
                <div className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
                    <h2 className="text-xl font-bold text-foreground mb-4">Edit Profile details</h2>
                    {statusMsg.text && (
                        <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${statusMsg.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                            {statusMsg.text}
                        </div>
                    )}
                    <form onSubmit={handleUpdateProfile} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Age</label>
                                <input type="number" min="0" max="150" value={formData.age} onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                                    className="w-full bg-input border border-border rounded-lg p-3 text-foreground outline-none focus:ring-2 focus:ring-primary transition-shadow" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Year (1-6)</label>
                                <input type="number" min="1" max="6" value={formData.year} onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                                    className="w-full bg-input border border-border rounded-lg p-3 text-foreground outline-none focus:ring-2 focus:ring-primary transition-shadow" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Department</label>
                            <input type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                className="w-full bg-input border border-border rounded-lg p-3 text-foreground outline-none focus:ring-2 focus:ring-primary transition-shadow" />
                        </div>
                        <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 rounded-lg transition-colors font-semibold shadow-md hover:shadow-lg mt-4">
                            Save Changes
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Profile;
