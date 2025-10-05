export default {

	async refundInvoiceDowload () {
	
		await refund_invoice_gen_and_email.run();
		const url = `http://178.156.165.247:8080${refund_invoice_gen_and_email.data.url_path}`;
		
		console.log(url);
		
    showModal(Modal2.name);
		
	}
}