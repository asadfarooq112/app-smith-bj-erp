export default {

	async invoiceDowload () {
	
		await invoice_buffer_get_and_email.run();
		const url = `http://178.156.165.247:8080${invoice_buffer_get_and_email.data.url_path}`;
		
		console.log(url);
		
    showModal(Modal2.name);
		
	}
}