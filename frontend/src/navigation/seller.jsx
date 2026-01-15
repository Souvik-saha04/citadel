import './seller.css'
import { MdStorefront, MdUpload } from "react-icons/md"

export default function Seller()
{
    return(
        <div className="seller-container">
            <div className="seller-header">
                <MdStorefront className="seller-header-icon"/>
                <h1><span className="seller-title-green">Become a</span> <span className="seller-title-white">Seller</span></h1>
                <p className="seller-subtitle">Join thousands of sellers and grow your business with greenGrocers</p>
            </div>
            
            <div className="seller-content">
                <div className="seller-form-section">
                    <div className="seller-section-title">Business Information</div>
                    
                    <div className="seller-row">
                        <div className="seller-field">
                            <label className="seller-label">Business Name</label>
                            <input type="text" className="seller-input" placeholder="Enter your business name"/>
                        </div>
                        <div className="seller-field">
                            <label className="seller-label">Business Type</label>
                            <select className="seller-input">
                                <option>Select business type</option>
                                <option>Individual</option>
                                <option>Partnership</option>
                                <option>Private Limited</option>
                                <option>Public Limited</option>
                            </select>
                        </div>
                    </div>

                    <div className="seller-row">
                        <div className="seller-field">
                            <label className="seller-label">GSTIN</label>
                            <input type="text" className="seller-input" placeholder="Enter GST number"/>
                        </div>
                        <div className="seller-field">
                            <label className="seller-label">PAN Number</label>
                            <input type="text" className="seller-input" placeholder="Enter PAN number"/>
                        </div>
                    </div>

                    <div className="seller-section-title">Contact Information</div>

                    <div className="seller-row">
                        <div className="seller-field">
                            <label className="seller-label">Contact Person Name</label>
                            <input type="text" className="seller-input" placeholder="Enter full name"/>
                        </div>
                        <div className="seller-field">
                            <label className="seller-label">Email Address</label>
                            <input type="email" className="seller-input" placeholder="Enter email address"/>
                        </div>
                    </div>

                    <div className="seller-row">
                        <div className="seller-field">
                            <label className="seller-label">Phone Number</label>
                            <input type="tel" className="seller-input" placeholder="Enter phone number"/>
                        </div>
                        <div className="seller-field">
                            <label className="seller-label">Alternate Phone Number</label>
                            <input type="tel" className="seller-input" placeholder="Enter alternate number"/>
                        </div>
                    </div>

                    <div className="seller-section-title">Business Address</div>

                    <div className="seller-row">
                        <div className="seller-field-full">
                            <label className="seller-label">Store Address</label>
                            <textarea className="seller-textarea" placeholder="House/Flat No., Street, Landmark..."/>
                        </div>
                    </div>

                    <div className="seller-row">
                        <div className="seller-field">
                            <label className="seller-label">City</label>
                            <input type="text" className="seller-input" placeholder="Enter city"/>
                        </div>
                        <div className="seller-field">
                            <label className="seller-label">State</label>
                            <select className="seller-input">
                                <option>Select state</option>
                                <option>Delhi</option>
                                <option>Maharashtra</option>
                                <option>Karnataka</option>
                                <option>Tamil Nadu</option>
                                <option>West Bengal</option>
                            </select>
                        </div>
                        <div className="seller-field">
                            <label className="seller-label">Pincode</label>
                            <input type="text" className="seller-input" placeholder="Enter pincode"/>
                        </div>
                    </div>

                    <div className="seller-section-title">Bank Details</div>

                    <div className="seller-row">
                        <div className="seller-field">
                            <label className="seller-label">Bank Name</label>
                            <input type="text" className="seller-input" placeholder="Enter bank name"/>
                        </div>
                        <div className="seller-field">
                            <label className="seller-label">Account Holder Name</label>
                            <input type="text" className="seller-input" placeholder="Enter account holder name"/>
                        </div>
                    </div>

                    <div className="seller-row">
                        <div className="seller-field">
                            <label className="seller-label">Account Number</label>
                            <input type="text" className="seller-input" placeholder="Enter account number"/>
                        </div>
                        <div className="seller-field">
                            <label className="seller-label">IFSC Code</label>
                            <input type="text" className="seller-input" placeholder="Enter IFSC code"/>
                        </div>
                    </div>

                    <div className="seller-section-title">Product Categories</div>

                    <div className="seller-row">
                        <div className="seller-field-full">
                            <label className="seller-label">Select Categories You Want to Sell</label>
                            <div className="seller-categories">
                                <label className="seller-checkbox">
                                    <input type="checkbox"/>
                                    <span>Fruits & Vegetables</span>
                                </label>
                                <label className="seller-checkbox">
                                    <input type="checkbox"/>
                                    <span>Dairy Products</span>
                                </label>
                                <label className="seller-checkbox">
                                    <input type="checkbox"/>
                                    <span>Bakery Items</span>
                                </label>
                                <label className="seller-checkbox">
                                    <input type="checkbox"/>
                                    <span>Beverages</span>
                                </label>
                                <label className="seller-checkbox">
                                    <input type="checkbox"/>
                                    <span>Snacks & Packaged Foods</span>
                                </label>
                                <label className="seller-checkbox">
                                    <input type="checkbox"/>
                                    <span>Personal Care</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="seller-section-title">Documents Upload</div>

                    <div className="seller-row">
                        <div className="seller-field">
                            <label className="seller-label">GST Certificate</label>
                            <div className="seller-upload">
                                <MdUpload className="seller-upload-icon"/>
                                <span>Upload GST Certificate</span>
                                <input type="file" className="seller-file-input"/>
                            </div>
                        </div>
                        <div className="seller-field">
                            <label className="seller-label">PAN Card</label>
                            <div className="seller-upload">
                                <MdUpload className="seller-upload-icon"/>
                                <span>Upload PAN Card</span>
                                <input type="file" className="seller-file-input"/>
                            </div>
                        </div>
                    </div>

                    <div className="seller-row">
                        <div className="seller-field">
                            <label className="seller-label">Bank Statement/Cancelled Cheque</label>
                            <div className="seller-upload">
                                <MdUpload className="seller-upload-icon"/>
                                <span>Upload Bank Document</span>
                                <input type="file" className="seller-file-input"/>
                            </div>
                        </div>
                        <div className="seller-field">
                            <label className="seller-label">Store Photo</label>
                            <div className="seller-upload">
                                <MdUpload className="seller-upload-icon"/>
                                <span>Upload Store Photo</span>
                                <input type="file" className="seller-file-input"/>
                            </div>
                        </div>
                    </div>

                    <div className="seller-actions">
                        <button className="seller-submit-btn">Submit Application</button>
                        <button className="seller-cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}