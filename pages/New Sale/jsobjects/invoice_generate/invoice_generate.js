export default {

	downloadPDF: async () => {
		await invoice_buffer_get_and_email.run();  
		let data = invoice_buffer_get_and_email.data; // getPdf is your API query
		const blob = new Blob([data], { type: 'application/pdf' });
		await download(blob, 'sample.pdf', 'application/pdf');
	}
}
